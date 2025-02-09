export default function extractJsonContent(str: string) {
  // Find the first { and last }
  const startIndex = str.indexOf("{");
  const endIndex = str.lastIndexOf("}");

  // Check if both braces were found
  if (startIndex === -1 || endIndex === -1) {
    throw new Error("No valid JSON object found in string");
  }

  // Extract just the content between the braces, including the braces
  let jsonContent = str.slice(startIndex, endIndex + 1);

  // Remove all newlines and extra spaces
  jsonContent = jsonContent.replace(/\s+/g, " ").trim();

  // Remove quotes around keys
  jsonContent = jsonContent.replace(/"([^"]+)":/g, "$1:");

  try {
    // Verify it's valid JSON after transformation
    const parsed = JSON.parse(
      jsonContent.replace(/([{,]\s*)(\w+):/g, '$1"$2":')
    );

    // Convert back to string with the desired format
    return JSON.stringify(parsed)
      .replace(/"([^"]+)":/g, "$1:") // Remove quotes around keys again after stringify
      .replace(/,/g, ", ") // Add space after commas for readability
      .replace(/:/g, ": "); // Add space after colons for readability
  } catch (e) {
    throw new Error("Extracted content is not valid JSON");
  }
}
