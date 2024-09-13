export function parseJson(inputStr: string | null): object {
  if (!inputStr) return { message: "No JSON string" };
  // Remove the ```json\n and trailing ```\n
  const cleanedStr = inputStr.replace(/```json\n/g, "").replace(/\n```$/, "");

  try {
    // Parse the cleaned string into a JSON object
    const jsonObject = JSON.parse(cleanedStr);
    return jsonObject;
  } catch (e) {
    return { message: `Error decoding JSON: ${(e as Error).message}` };
  }
}
