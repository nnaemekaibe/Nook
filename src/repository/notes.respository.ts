const options = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
export const getPageBlocks = async (id: string) =>{
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/notion/${id}`, options)
    return res.json()
}

export const getEverythingAvailableToBot = async () =>{
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE}/search`,
      options
    );
    return res.json()
}