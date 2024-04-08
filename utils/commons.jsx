export default function currentDateExpected(){
    const getDate = new Date()
    const year = getDate.getFullYear()
    const month = String(getDate.getMonth() + 1).padStart(2, '0')
    const day = String(getDate.getDate()).padStart(2, '0')

    return (`${day}-${month}-${year}`)
}
