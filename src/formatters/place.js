export default (place) => ({
  ...place,
  pictures: place.pictures && place.pictures.map(p => p.url),
  videos: place.videos && place.videos.map(p => p.url),
})

