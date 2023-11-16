/* eslint-disable react/prop-types */
import { FC, createElement } from "react";
import ReactMarkdown from "react-markdown";
import { PluggableList } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

const MARKDOWN_PLUGINS = [rehypeRaw] as PluggableList;

interface AppMarkdownProps {
  content: string;
  highlightStr?: string;
}

const shouldHighlight = (text: unknown, highlightStr: string) => {
  if (typeof text !== "string") {
    return false;
  }

  const formattedText = text.toLowerCase();
  const formattedHighlightStr = highlightStr.toLowerCase();

  return (
    formattedHighlightStr.includes(formattedText) ||
    formattedText.includes(formattedHighlightStr)
  );
};

export const AppMarkdown: FC<AppMarkdownProps> = ({
  content,
  highlightStr = "",
}) => {
  function highlightComponent(componentType: string, customClassNames = "") {
    return (props: Record<string, unknown>) => {
      const componentClassNames = props?.classNames || "";
      const componentContent = (props?.children as unknown[])?.[0] || undefined;
      const highlightClassName = shouldHighlight(componentContent, highlightStr)
        ? "app-highlight"
        : "";
      const component = createElement(componentType, {
        ...props,
        className: `${componentClassNames} ${highlightClassName} ${customClassNames}`,
      });

      return component;
    };
  }

  function getParagraphFragmentToHighlight(paragraphText: string) {
    const MIN_PARAGRAPH_HIGHLIGHT_LENGTH = 7;
    const formattedHighlightStr = highlightStr.toLowerCase();

    const paragraphChars = paragraphText.split("");
    const paragraphHighlights = [];
    let possibleParagraphHighlight = "";
    for (const char of paragraphChars) {
      const newPossibleParagraphHighlight =
        `${possibleParagraphHighlight}${char}`.toLowerCase();
      const isPossibleHighlightValid = formattedHighlightStr.includes(
        newPossibleParagraphHighlight,
      );

      if (isPossibleHighlightValid) {
        possibleParagraphHighlight += `${char}`;
        continue;
      }

      if (possibleParagraphHighlight.length === highlightStr.length) {
        return possibleParagraphHighlight;
      }

      if (possibleParagraphHighlight.length > MIN_PARAGRAPH_HIGHLIGHT_LENGTH) {
        paragraphHighlights.push(possibleParagraphHighlight);
      }

      possibleParagraphHighlight = char;
    }

    if (possibleParagraphHighlight.length > MIN_PARAGRAPH_HIGHLIGHT_LENGTH) {
      paragraphHighlights.push(possibleParagraphHighlight);
    }

    return paragraphHighlights.reduce(
      (best, curr) => (best.length > curr.length ? best : curr),
      "",
    );
  }

  return (
    <ReactMarkdown
      rehypePlugins={MARKDOWN_PLUGINS}
      components={{
        a: highlightComponent("a", "text-[#C10E21]"),
        span: highlightComponent("span"),
        strong: highlightComponent("strong"),
        em: highlightComponent("em"),
        blockquote: highlightComponent("blockquote"),
        h1: highlightComponent("h1"),
        h2: highlightComponent("h2"),
        h3: highlightComponent("h3"),
        h4: highlightComponent("h4"),
        h5: highlightComponent("h5"),
        h6: highlightComponent("h6"),
        p(props) {
          const paragraphContent = props.children[0];
          if (!shouldHighlight(paragraphContent, highlightStr)) {
            return <p {...props}></p>;
          }

          const paragraphText = paragraphContent as string;
          const paragraphHighlight =
            getParagraphFragmentToHighlight(paragraphText);

          const highlightIdx = paragraphText.indexOf(paragraphHighlight);
          const beforeHighlight = paragraphText.slice(0, highlightIdx);
          const afterHighlight = paragraphText.slice(
            highlightIdx + paragraphHighlight.length,
          );

          return (
            <p>
              {beforeHighlight}
              <span className="app-highlight">{paragraphHighlight}</span>
              {afterHighlight}
            </p>
          );
        },
        ol(props) {
          return (
            <ol
              {...props}
              style={{ listStyleType: "decimal", paddingInlineStart: "40px" }}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
