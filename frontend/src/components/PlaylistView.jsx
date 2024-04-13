import { Card } from "./index"
export function PlaylistView({ cardsData})
{

    return(
        <div className='container mb-8'>
           
            <div className=' w-full flex flex-row flex-wrap mb-4'>
            {
                cardsData.map((cardData)=><Card key={cardData._id} cardData={cardData} />)
            }
            </div>
        </div>

    )
}