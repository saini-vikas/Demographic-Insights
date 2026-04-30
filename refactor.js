const fs = require('fs');
const path = require('path');

const dir = 'app/components/ServerComponents';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'Indicator.ts' && f !== 'Countries.ts');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Add import fetchIndicators
  if (!content.includes('fetchIndicators')) {
    content = content.replace(/"use server";\n/, '"use server";\n\nimport fetchIndicators from "./Indicator";\n');
  }

  // 2. Find indicator ID
  const urlMatch = content.match(/indicators\/(\d+)\//);
  if (!urlMatch) {
    console.log('No URL match for', file);
    return;
  }
  const indicatorId = urlMatch[1];

  // 3. Add to the exported Type
  // Find "export type [Name] = {" and add id and topicName before "};"
  const typeNameMatch = content.match(/export type (\w+) = {/);
  if (typeNameMatch) {
      const typeName = typeNameMatch[1];
      // Note: Some types might be Data, but the main one usually matches the filename or is the second one.
      // Actually, let's just find the type that has "locationId" or similar, and add id, topicName to it.
      // Better: find "locationId: number | undefined;" and append there.
      content = content.replace(/locationId:\s*number\s*\|\s*undefined;/, 'locationId: number | undefined;\n  id?: number;\n  topicName?: string;');
  }

  // 4. Inject fetchIndicators call before return
  // Find `return {` that follows the mapping of data.
  // We can look for `return {\n    data:`
  if (!content.includes('const indicators = await fetchIndicators(')) {
    const injectStr = `  const indicators = await fetchIndicators(${indicatorId});\n  const indicator = indicators?.[0];\n\n  return {`;
    content = content.replace(/\s*return\s*{/, '\n' + injectStr);
  }

  // 5. Update the returned object properties
  // Look for `description: ...` and replace it, and add id, topicName.
  content = content.replace(/description:\s*[^,\n]+,/, `description: indicator?.description,\n    id: indicator?.id,\n    topicName: indicator?.topicName,`);

  fs.writeFileSync(filePath, content);
  console.log('Processed', file);
});
