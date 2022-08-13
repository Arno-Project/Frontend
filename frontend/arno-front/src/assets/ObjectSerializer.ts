export class ObjectSerializer {
  public static serializeData(data: object[]): Array<string[]> {
    let result: Array<string[]> = [Object.keys(data[0])];
    for (const elem of data) {
      result.push(Object.values(elem).map(ObjectSerializer.serializeElement));
    }
    return result;
  }

  private static serializeElement(element: any): string {
    if (!Boolean(element)) {
      return "";
    }
    if (typeof element === 'object') {
      return JSON.stringify(element).replaceAll(",", " - ");
    }
    return element.toString()
  }
}
