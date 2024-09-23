import { useSQLiteContext } from "expo-sqlite"

export function tamaServ(){
    const database = useSQLiteContext();
    async function createTama({nome , imagem} :{nome :string, imagem : string} ){

        const query = await database.prepareAsync(`INSERT  INTO tama VALUES
            ($nome,$imagem);`)
        try{
                await query.executeAsync({nome,imagem})
    
        }catch(error){

        }finally{
            await query.finalizeAsync()
        }


       
    }

    return {createTama}
}