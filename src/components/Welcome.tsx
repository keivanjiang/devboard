type WelcomeProps = {
    name: string;
};

function Welcome({ name }: WelcomeProps) {
    return <h2>Welcome, {name}</h2>;
}

export default Welcome;