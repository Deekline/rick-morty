class LocalStorage {
  constructor () {
    this.store = window.localStorage
  }

  getItem (favorite) {
    const arr = JSON.parse(this.store.getItem('favorites'))
    if (arr) {
      return arr.find(fav => fav.id === favorite.id)
    }
    return false
  }

  setItem (favorite) {
    console.log(this.store)
    const oldValue = JSON.parse(this.store.getItem('favorites'))
    let newFavs
    if (oldValue?.length) {
      const favExist = oldValue.find(fav => fav.id === favorite.id)
      if (favExist) {
        throw Error('Already exist')
      }
      newFavs = [...oldValue, favorite]
    } else {
      newFavs = [favorite]
    }
    console.log(newFavs)
    this.store.setItem('favorites', JSON.stringify(newFavs))
  }

  getAllItems () {
    return JSON.parse(this.store.getItem('favorites'))
  }

  removeItem (id) {
    const oldValue = JSON.parse(this.store.getItem('favorites'))
    let newFavs
    if (oldValue?.length) {
      const favExist = oldValue.filter(fav => fav.id !== id)
      newFavs = [...favExist]
    }
    this.store.setItem('favorites', JSON.stringify(newFavs))
  }
}

const localStorage = new LocalStorage()

export default localStorage
