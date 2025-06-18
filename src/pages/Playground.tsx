
import PageTitle from '../components/PageTitle';
import MinecraftStatus from '../components/MinecraftStatus';


function Playground() {
    const serverAddress = '150.136.139.34:25565';
    return (
        <div>
            <PageTitle title="Playground" />
            <h1>Dev Sandbox</h1>
            <p>A space to try out ideas, experiment with APIs, and break things on purpose.</p>

            <div style={{ marginTop: '2rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
                <h3>My Personal Minecraft Server</h3>
                <p>I'm hosting a modded Minecraft server on Oracle's virtual cloud network, running Ubuntu 20.04. 
                The server runs a custom modpack centered around the "Cobblemon" mod, which adds Pokémon to the game.</p>

                <p>I've also added a few small quality-of-life mods to keep things light and manageable, without overwhelming the game with too much content.
                Every time I add a new mod, I cross my fingers and hope nothing breaks, though, I don’t mind troubleshooting, haha. </p>
                
                <p>The server usually has around five players (my friends), each logging in whenever they want. 
                Below is the current server status and a map preview of the areas we’ve explored so far.</p>


                <h4>Minecraft Server Status</h4>
                <MinecraftStatus address={serverAddress} />

                <h4>Squaremap Preview</h4>
                <iframe
                    src="http://150.136.139.34:8080/"
                    title="Minecraft Map"
                    width="300"
                    height="200"
                    style={{ border: '1px solid #ccc' }}
                />


            </div>
        </div>
    );
}

export default Playground;
