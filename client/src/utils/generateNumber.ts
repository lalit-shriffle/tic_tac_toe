export function geneateNewGameId():string {
    let max = 1000;
    let min = 100;
    const id: string = String(Math.round(Math.random() * (max - min) + min));
    return id;
  }