import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'public/meet-shah-resume.pdf');
const commands = [];

function text(value, x, y, size = 9, bold = false, color = '0.14 0.18 0.15') {
  const safe = value.replace(/[^\x20-\x7E]/g, '-').replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
  commands.push(`${color} rg BT /${bold ? 'F2' : 'F1'} ${size} Tf ${x} ${y} Td (${safe}) Tj ET`);
}

function section(label, y) {
  text(label.toUpperCase(), 48, y, 10, true, '0.22 0.36 0.22');
  commands.push(`0.77 0.96 0.40 RG 48 ${y - 5} m 564 ${y - 5} l S`);
}

text('Meet Shah', 48, 748, 27, true, '0.06 0.08 0.07');
text('SOFTWARE DEVELOPER  |  FULL-STACK / BACKEND / CLOUD', 49, 729, 10, true, '0.25 0.36 0.24');
text('Ahmedabad, India  |  shahmeet2626@gmail.com  |  8238596629', 49, 712, 8);
text('github.com/meet8406  |  linkedin.com/in/meet-shah-9649b53a2/  |  meet8406.github.io', 49, 699, 8);

section('Profile', 674);
text('Software developer at Technman Consulting building full-stack products across interfaces, APIs,', 49, 657, 9);
text('business workflows, background processing, and cloud delivery.', 49, 644, 9);

section('Experience', 620);
text('Software Developer  |  Technman Consulting', 49, 603, 11, true);
text('December 2024 - Present', 49, 589, 8, false, '0.38 0.42 0.38');
text('- Build React dashboards alongside backend services and APIs.', 54, 572, 9);
text('- Contribute to HRMS workflows for attendance, leave, employee records, and payroll.', 54, 558, 9);
text('- Work with salary structures, payslips, resignation, and Full & Final processes.', 54, 544, 9);
text('- Support production delivery using AWS, Docker, Nginx, SSL, and deployment workflows.', 54, 530, 9);
text('- Build scheduled email and reporting workflows with Celery and Redis.', 54, 516, 9);

section('Selected Projects', 491);
text('HRMS / HRATS  |  React, Django REST, PostgreSQL, Celery, Redis, AWS', 49, 473, 9, true);
text('People operations platform covering geofenced attendance, payroll, leave, resignation, and', 54, 459, 8);
text('scheduled HR communication.', 54, 447, 8);
text('TNM Tracker  |  Python, FastAPI, PostgreSQL, AWS S3, React', 49, 428, 9, true);
text('Employee activity platform connecting a desktop agent, service API, cloud storage, and dashboard.', 54, 414, 8);
text('AI Resume Analyzer  |  React, Node.js, Django, Python, PostgreSQL, LLMs', 49, 395, 9, true);
text('Resume analysis application exploring language-model-driven candidate feedback.', 54, 381, 8);

section('Education', 355);
text('Bachelor of Computer Applications (Honours)  |  SVGU', 49, 337, 9, true);
text('2023 - 2027', 49, 323, 8);

section('Technical Skills', 298);
text('Frontend: React, JavaScript, Tailwind CSS', 49, 280, 9);
text('Backend: Python, Django REST Framework, FastAPI, Node.js', 49, 266, 9);
text('Data and cloud: PostgreSQL, AWS, S3, Docker, Nginx', 49, 252, 9);
text('Automation: Celery, Redis  |  AI: LLM workflows', 49, 238, 9);

text('Draft generated from the portfolio site. Updated October 2026.', 49, 42, 7, false, '0.43 0.47 0.43');

const stream = `${commands.join('\n')}\n`;
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  `<< /Length ${Buffer.byteLength(stream, 'ascii')} >>\nstream\n${stream}endstream`,
];

let document = '%PDF-1.4\n';
const offsets = [0];
for (let index = 0; index < objects.length; index += 1) {
  offsets.push(Buffer.byteLength(document, 'ascii'));
  document += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
}
const xrefOffset = Buffer.byteLength(document, 'ascii');
document += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets.slice(1)) document += `${String(offset).padStart(10, '0')} 00000 n \n`;
document += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

await mkdir(dirname(output), { recursive: true });
await writeFile(output, Buffer.from(document, 'ascii'));
console.log(`Wrote ${output}`);
