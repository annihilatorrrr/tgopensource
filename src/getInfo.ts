import fetch from "node-fetch";

export default async (match: RegExpMatchArray) => {
  const user = match[3];
  const repo = match[4];

  if (!user || !repo) {
    return;
  }

  try {
    const json = await (
      await fetch(`https://api.github.com/repos/${user}/${repo}`)
    ).json();

    return {
      name: json.full_name,
      description: json.description,
      url: json.svn_url,
      license: json.license?.name,
    };
  } catch (err) {
    return;
  }
};
