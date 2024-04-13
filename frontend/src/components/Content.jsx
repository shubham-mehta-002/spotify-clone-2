import {Navbar} from './index'
import {PlaylistView} from './index'
import spotifyLogo from '../images/spotifyLogo.png'

export function Content()
{
    // will fetch this data from api
    const data=[{
            title:"hello",
            description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
            image:{spotifyLogo}
        },
        {
            title:"hello",
            description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
            image:{spotifyLogo}
        },
        {
            title:"hello",
            description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
            image:{spotifyLogo}
        },
        {
            title:"hello",
            description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
            image:{spotifyLogo}
        },
        {
            title:"hello",
            description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
            image:{spotifyLogo}
        },
        {
            title:"hello",
            description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
            image:{spotifyLogo}
        },
        {
            title:"hello",
            description:" hello hello ldnvlsdnvllsnvlsvndlnvsldnvlsndvhello this my world hello",
            image:{spotifyLogo}
        }
    ]

    return(
        <div className="h-full w-3/4 p-2">
            <div className="h-full w-full bg-customLightBlack rounded-lg ">
                <Navbar />
                <div className='cards p-5 h-9/10 w-full overflow-y-auto flex flex-col gap-4'>
                   <PlaylistView about="My playlist" cardsData={data}/>
                   <PlaylistView about="My playlist" cardsData={data}/>
                </div>               
                
            </div>
        </div>
    )
}

