export function validateNewGameInputs(name:string,gameId:string){
    let errors:any = {};
    if(!name || name.length <= 0 ){
        errors.name = "Name must required"
    }

    if(!gameId || gameId.length <= 0){
        errors.gameId = "Game id must required"
    }

    return errors;
}

export function validateStartGameInputs(name){
    const errors:any = {};

    if(!name || name.length <= 0){
        errors.name = "Name must required"
    }

    return errors;


}