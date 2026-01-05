

export default function Header({name}) {

    const year = new Date().getFullYear()

    return(
        <header>
            <h2>
                This is Batch4 react class!
            </h2>

            <p>
                My name is {name}
            </p>

            <p>
                The year is {year}
            </p>
        </header>
    )
}