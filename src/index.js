document.addEventListener(`DOMContentLoaded`, () => {
    fetch(`http://localhost:3000/ramens`)
        .then(resp => resp.json())
        .then(data => data.forEach(makeEverything))

    const menu = document.getElementById(`ramen-menu`)
    const detailImg = document.querySelector(`.detail-image`)
    const detailName = document.querySelector(`.name`)
    const detailRest = document.querySelector(`.restaurant`)
    const detailRating = document.getElementById(`rating-display`)
    const detailComm = document.getElementById(`comment-display`)
    const submit = document.getElementById(`submit`)
    let newName = document.getElementById(`new-name`)
    let newImg = document.getElementById(`new-image`)
    let newRest = document.getElementById(`new-restaurant`)
    let newRating = document.getElementById(`new-rating`)
    let newComm = document.getElementById(`new-comment`)

    function makeEverything({ id, name, restaurant, image, rating, comment }) {
        let img = document.createElement(`img`)

        img.src = image
        menu.appendChild(img)
        img.addEventListener(`click`, () => {
            detailImg.src = image
            detailName.textContent = name
            detailRest.textContent = restaurant
            detailRating.textContent = rating
            detailComm.textContent = comment
        })

    }
    submit.addEventListener(`click`, (e) => {
        e.preventDefault()

        let newObj = {
            "name": newName.value,
            "restaurant": newRest.value,
            "image": newImg.value,
            "rating": newRating.value,
            "comment": newComm.value
        }

        fetch(`http://localhost:3000/ramens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newObj)
        })
            .then(resp => resp.json())
            .then(makeEverything(newObj))
            
            document.getElementById(`new-ramen`).reset()
    })

})