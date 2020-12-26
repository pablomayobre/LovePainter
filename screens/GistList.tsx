import { Gists } from "../utils/getGists";

export default function GitList({ pages, current, oauth, gists }: Gists) {
  console.log(pages, current, oauth, gists);
  return (
    <>
      <h1>Here you would see your gists</h1>
    </>
  );
}
