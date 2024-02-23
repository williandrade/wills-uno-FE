
interface UnoRoom {
    roomId: string; // Unique room identifier
    roomName?: string;  // Optional friendly name
    players: Player[];  // Array of players in the room
    gameState: GameState;  // Current state of the game in this room
    maxPlayers: number; // Maximum allowed players in the room
    options?: UnoRoomOptions; // Room-specific options (if any)
}

interface Player {
    id: string; // Unique player identifier
    name: string; // Player's name
    hand: UnoCard[]; // Array of cards in the player's hand
    isHost: boolean; // True if the player is the host of the room
    isReady: boolean; // True if the player is ready to start the game
    isTurn: boolean; // True if it's the player's turn
    isUno: boolean; // True if the player has called UNO
    isSpectator: boolean; // True if the player is just spectating
}

interface GameState {
    deck: UnoCard[]; // Array of cards in the deck
    discardPile: UnoCard[]; // Array of cards in the discard pile
    currentPlayerId?: string | null; // The player whose turn it is
    direction: Direction; // The direction of play
    winnerId: string | null; // The winner of the game (if any)
    isOver: boolean; // True if the game is over
    isStarted: boolean; // True if the game has started
    isPaused: boolean; // True if the game is paused
    isUnoCall: boolean; // True if a player has called UNO
}

interface UnoRoomOptions {
    // ... Any customizable options for the room ...
}

interface Direction {
    value: number; // 1 for clockwise, -1 for counter-clockwise
}

enum Color {
    Red = 'Red',
    Yellow = 'Yellow',
    Green = 'Green',
    Blue = 'Blue',
}

enum Value {
    Zero = '0',
    One = '1',
    Two = '2',
    Three = '3',
    Four = '4',
    Five = '5',
    Six = '6',
    Seven = '7',
    Eight = '8',
    Nine = '9',
    Skip = 'skip',
    Reverse = 'reverse',
    DrawTwo = 'drawTwo',
    Wild = 'wild',
    WildDrawFour = 'wildDrawFour',
}

enum Type {
    Number,
    Action,
    Wild,
    WildDrawFour,
}
interface UnoCard {
    color: Color | null; // 'null' for wild cards
    value: Value;
    type: Type;
}

export {Color, Value, Type};
export type { UnoRoom, Player, GameState, UnoRoomOptions, Direction, UnoCard };
