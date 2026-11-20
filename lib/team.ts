export type TeamMember = { id: string; name: string; position: string; category: string; order: number };

export const DEFAULT_TEAM: TeamMember[] = [
  ["rishi-kowlessar", "Rishi Kowlessar", "Founder / CEO / Chairman", "Leadership Team"],
  ["k-nagee", "K Nagee", "Co-Founder / Director of Software Engineering", "Leadership Team"],
  ["j-lightfoot", "J Lightfoot", "Director of Human Resources", "Leadership Team"],
  ["d-baptiste", "D Baptiste", "Corporate Secretary", "Leadership Team"],
  ["r-mitchell", "R Mitchell", "Senior Software Engineer / Web Lead", "Engineering Team"],
  ["j-edwards", "J Edwards", "Senior Software Engineer", "Engineering Team"],
  ["d-mar", "D Mar", "Senior Trainee Software Engineer", "Engineering Team"],
  ["c-mitchell", "C Mitchell", "Junior Software Engineer", "Engineering Team"],
  ["c-walker", "C Walker", "Junior Trainee Software Engineer", "Engineering Team"],
  ["c-lee-browne", "C Lee Browne", "Junior Trainee Software Engineer", "Engineering Team"],
  ["n-logan", "N Logan", "Junior Trainee Software Engineer / Beta Tester", "Engineering Team"],
  ["a-ramjitsingh", "A Ramjitsingh", "Assistant to Director Software Engineering", "Engineering Team"],
  ["a-roopnarinesingh", "A Roopnarinesingh", "Web / App Designer / Social Media Manager", "Design & Creative Team"],
  ["s-persad", "S Persad", "Graphics Designer / Beta Tester", "Design & Creative Team"],
  ["k-alleyne", "K Alleyne", "Graphics Designer / Beta Tester", "Design & Creative Team"],
  ["z-ramsaroop", "Z Ramsaroop", "Graphic Designer", "Design & Creative Team"],
  ["k-girdiharry", "K Girdiharry", "Graphic Designer / Social Media Assistant", "Design & Creative Team"],
  ["m-khan", "M Khan", "Beta Tester", "Quality Assurance"],
].map(([id, name, position, category], order) => ({ id, name, position, category, order }));

export function cleanTeamMember(value: unknown, order = 0): Omit<TeamMember, "id"> | null {
  const data = value as Record<string, unknown>;
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const position = typeof data?.position === "string" ? data.position.trim() : "";
  const category = typeof data?.category === "string" ? data.category.trim() : "";
  if (!name || !position || !category) return null;
  return { name, position, category, order: typeof data.order === "number" && Number.isFinite(data.order) ? data.order : order };
}
