import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';



export default function HomePage(props){
  return(
    <MeetupList meetups={props.meetups}/>
  )
  
}

//this function is will run on the server after deployment instead of during the building
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   // fetch data from API
//   return {
//     props:{
//       meetups : DUMMY_MEETUPS
//     } 
//   };

// }

// this function will be run during building the project, and revalidate is : how many times after builduíng should 
// the data updated in order to show on the page
export async function getStaticProps(){
  // feth the data from the API
  const client = await MongoClient.connect('')//your credintials
  const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();

    client.close();
return{
  props :{
    meetups: meetups.map((meetup)=>({
      // for some reason it doesnt show the below infos
    // title: meetup.title,
    // image: meetup.image,
    // address: meetup.address,
    id: meetup._id.toString(),
    }))
  },
  revalidate: 30
};
}
