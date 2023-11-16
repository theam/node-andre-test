export class TextUtils {
  static getSanitizedUrlTitle(urlString: string): string {
    try {
      const url = new URL(urlString);
      const path = url.pathname;
      const urlSegments = path.split("/").filter((segment) => segment !== "");
      const lastSegment = urlSegments[urlSegments.length - 1];
      const title = lastSegment.replace(/[-_]/g, " ");
      const formattedTitle = `${title[0].toUpperCase()}${title.slice(1)}`;
      return formattedTitle;
    } catch (error) {
      return urlString;
    }
  }
}
