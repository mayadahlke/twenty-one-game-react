import Card from "../card/Card";

export default function Hand({ cards, player, play, score }) {
    /*************************** render *****************************/
    return (
        <div className="flex flex-col items-center h-full p-3 grow w-96">
            <div className="text-2xl">
                {player}: {play}
            </div>
            <div className="text-2xl">Score: {score}</div>
            <div
                className="flex flex-wrap justify-center items-center gap-3 grow mb-[52px]"
                data-testid={`${player.toLowerCase()}-cards`}
            >
                {cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
}
