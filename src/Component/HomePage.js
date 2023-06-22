import React from 'react'

function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    const [like, setLike] = React.useState(0)

    const handleClick = () => {
        setLike(like + 1);

    }
    return (
        <div>
            <Header title="Develop. Preview. Ship. 🚀" />
            <ul className='text-xl text-sky-500 font-bold'>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>

            <button className='btn btn-success' onClick={handleClick}>Like ({like})</button>
        </div>
    )
}
