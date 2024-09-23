import { useSQLiteContext } from "expo-sqlite"

export function tamaServ(){
<<<<<<< Updated upstream
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
=======
const database = useSQLiteContext()

function createTama({nome,imagem}:{nome:string, imagem:string})
try {
    
} catch (error) {
    
}
    return {}
>>>>>>> Stashed changes
}