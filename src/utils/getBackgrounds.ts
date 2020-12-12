const createBackground = (from : string, to : string) =>
  `linear-gradient(45deg, ${from} 0%, ${to} 100%)`

export const getBackgrounds = (count : number) => {
  const BACKGROUNDS = [
    createBackground('#ed765e', '#fea858'),
    createBackground('#4b086d', '#acc0fe'),
    createBackground('#f6a09a', '#8a1f1d'),
    createBackground('#f2ecb6', '#a96f44'),
    createBackground('#50d5b7', '#067d68'),
    createBackground('#f6b2e1', '#58126a'),
    createBackground('#0c7bb3', '#f2bae8'),
    createBackground('#e3ff73', '#e27c39'),
    createBackground('#e65758', '#771d32'),
    createBackground('#b60f46', '#d592ff'),
    createBackground('#849b5c', '#bfffc7'),
  ]

  const bgs = []
  while(bgs.length < count)
  {
    const id = Math.floor(Math.random() * BACKGROUNDS.length)
    const [bg] = BACKGROUNDS.splice(id, 1)

    bgs.push(bg)
  }
  
  return bgs
}