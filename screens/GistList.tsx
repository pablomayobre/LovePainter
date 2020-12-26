import { Gists } from "../utils/getGists";

export default function GitList ({pages, current, token, gists}: Gists) {
  console.log(pages, current, token, gists)
  return <>
    <h1>Here you would see your gists</h1>
  </>
}