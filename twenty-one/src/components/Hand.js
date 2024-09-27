import Card from "./Card";

export default function Hand({ cards, player, play, score, hidden = false }) {
    /*************************** render *****************************/
    return (
        <div className="flex flex-col items-center h-full grow">
            <div className="text-2xl">
                {player}: {play}
            </div>
            <div className="text-2xl">Score: {score}</div>
            <div className="flex flex-wrap justify-center items-center gap-3 grow mb-[52px]">
                {cards.map((card) => (
                    <Card key={card.id} card={card} hidden={hidden} />
                ))}
            </div>
        </div>
    );
}
