export function parseJson(inputStr: string | null): object | string {
  if (!inputStr) return "No JSON string";
  // Remove the ```json\n and trailing ```\n
  const cleanedStr = inputStr.replace(/```json\n/g, "").replace(/\n```$/, "");

  try {
    // Parse the cleaned string into a JSON object
    const jsonObject = JSON.parse(cleanedStr);
    return jsonObject;
  } catch (e) {
    return `Error decoding JSON: ${(e as Error).message}`;
  }
}
