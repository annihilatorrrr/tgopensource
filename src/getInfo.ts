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

    const toReturn = {
      name: json.name,
      description: json.description,
      url: json.svn_url,
      license: json.license?.name,
    };

    if (!toReturn.description || !toReturn.license) {
      return;
    }

    return toReturn;
  } catch (err) {
    return;
  }
};
