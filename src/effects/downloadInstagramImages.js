export default async function downloadInstagramImages(number = 10) {
  const res = await fetch(
    `https://www.instagram.com/graphql/query/?query_hash=bfa387b2992c3a52dcbe447467b4b771&variables={%22id%22:%229721684379%22,%22first%22:${number}}`
  )
  const { data } = await res.json()
  const images = data.user.edge_owner_to_timeline_media.edges.map(i => i.node.display_url)
  return images
}
