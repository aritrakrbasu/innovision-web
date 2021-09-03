import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import Sidebar from './components/Sidebar'
import commingsoon from './comming_soon.svg'
import './styles/commingsoon.css'
import { db, firebasevalue } from './firebase'
import { useAuth } from './context/AuthProvider'
function Vote() {

    const [videos, setVideos] = useState([])
    const [artwork,setArtwork] =useState([])
    const [photos,setPhotos] =useState([])
    const [filter,setFilter] =useState("artwork")

    const {currentUser} = useAuth()
    var voting = {
        "BfmVAxVo4BfukNesbN1YbAIqWqR2" :{
            submittedBy : "BfmVAxVo4BfukNesbN1YbAIqWqR2",
            submittedByName : "Ayantika Chakrabarti",
            vote:0,
            orderBy:1
        },
        "b1FX0AhTL1UGVUMctgkSZEafjHj2" :{
            submittedBy : "b1FX0AhTL1UGVUMctgkSZEafjHj2",
            submittedByName : "Bidipta Saha",
            vote:0,
            orderBy:2
        },
        "AVbtflKOWZRyb8AetXpSYCFljlB3" :{
            submittedBy : "AVbtflKOWZRyb8AetXpSYCFljlB3",
            submittedByName : "Bidisha Saha",
            vote:0,
            orderBy:3
        },
        "KLeLGiHlCFQPiEqLDK5w60ZUziz2" :{
            submittedBy : "KLeLGiHlCFQPiEqLDK5w60ZUziz2",
            submittedByName : "Debasmita Dey",
            vote:0,
            orderBy:4
        },
        "sThxp9NvPNb4bEgRyJC7pKMGzyz2" :{
            submittedBy : "sThxp9NvPNb4bEgRyJC7pKMGzyz2",
            submittedByName : "Dipanjan Das",
            vote:0,
            orderBy:5
        },
        "tH3AJuPfJXfliIxGZeluVS4e5wC2" :{
            submittedBy : "tH3AJuPfJXfliIxGZeluVS4e5wC2",
            submittedByName : "	Faisal Khan",
            vote:0,
            orderBy:6
        },
        "gRzsNd0pHDb4FSKN7q05ae7mNxB2" :{
            submittedBy : "gRzsNd0pHDb4FSKN7q05ae7mNxB2",
            submittedByName : "Ishaani Goswami ",
            vote:0,
            orderBy:7
        },
        "YBZgjPh3HoakGYGM3lhNot4HtWy1" :{
            submittedBy : "YBZgjPh3HoakGYGM3lhNot4HtWy1",
            submittedByName : "Ishani Samanta",
            vote:0,
            orderBy:8
        },
        "dlNUnr9PpeWARCuwW27g184h02v1" :{
            submittedBy : "dlNUnr9PpeWARCuwW27g184h02v1",
            submittedByName : "Kankona Chowdhury",
            vote:0,
            orderBy:9
        },
        "RYIn55EFlpTn5gTkfvCgBwNEdYE3" :{
            submittedBy : "RYIn55EFlpTn5gTkfvCgBwNEdYE3",
            submittedByName : "Sumana Sadhukhan",
            vote:0,
            orderBy:10
        },
        "V0hZ60M6UJNP1NEEJ8CjjsUKCX13" :{
            submittedBy : "V0hZ60M6UJNP1NEEJ8CjjsUKCX13",
            submittedByName : "KOUSTAV SAHA",
            vote:0,
            orderBy:11
        },
        "c3nyGmfRcrNyU15QYzKVqwUGnb73" :{
            submittedBy : "c3nyGmfRcrNyU15QYzKVqwUGnb73",
            submittedByName : "Laboni Das",
            vote:0,
            orderBy:12
        },
        "ffhoCUjKmocE7G7Buxnbkswp8633" :{
            submittedBy : "ffhoCUjKmocE7G7Buxnbkswp8633",
            submittedByName : "MD FAIZAN ANSARI ",
            vote:0,
            orderBy:13
        },
        "YIcbKuBK2oNFBcIoV4uutidMWXs1" :{
            submittedBy : "YIcbKuBK2oNFBcIoV4uutidMWXs1",
            submittedByName : "Meghna Chakraborty",
            vote:0,
            orderBy:14
        },
        "69t2JKewvPgk3869qIjqgrl828S2" :{
            submittedBy : "69t2JKewvPgk3869qIjqgrl828S2",
            submittedByName : "Sarbari Banerjee",
            vote:0,
            orderBy:15
        },
        "jeW2MOZplJZdwWKADyuycpWdhsT2" :{
            submittedBy : "jeW2MOZplJZdwWKADyuycpWdhsT2",
            submittedByName : "Soham Sarkar",
            vote:0,
            orderBy:16
        },
        "z5szz1vgC0U5gWAX9lCwNWy7gd82" :{
            submittedBy : "z5szz1vgC0U5gWAX9lCwNWy7gd82",
            submittedByName : "	Srinanda Das",
            vote:0,
            orderBy:17
        },
        "UydCrUfBoAh2EuQkplnwhUWi1Tx2" :{
            submittedBy : "UydCrUfBoAh2EuQkplnwhUWi1Tx2",
            submittedByName : "Tanushka Kanjilal",
            vote:0,
            orderBy:18
        },
    }



    // var voting = {
    //     "STBoT2GFQPhLGLwK3PnV4eHR97Q2" :{
    //         submittedBy : "STBoT2GFQPhLGLwK3PnV4eHR97Q2",
    //         submittedByName : "Abhik Chanda",
    //         vote:0,
    //         orderBy:1
    //     },
    //     "1UrukcYuWqXvUgJly8lbsr4zwLo1" :{
    //         submittedBy : "1UrukcYuWqXvUgJly8lbsr4zwLo1",
    //         submittedByName : "Ananya Dasgupta",
    //         vote:0,
    //         orderBy:2
    //     },
    //     "JL2cbk2svxPSieou2Xuobs51FmF2" :{
    //         submittedBy : "JL2cbk2svxPSieou2Xuobs51FmF2",
    //         submittedByName : "AISHIK DAS",
    //         vote:0,
    //         orderBy:3
    //     },
    //     "1CUmCxPxbDMFAQhjDSPicPucXGO2" :{
    //         submittedBy : "1CUmCxPxbDMFAQhjDSPicPucXGO2",
    //         submittedByName : "Ankit Malakar",
    //         vote:0,
    //         orderBy:4
    //     },
    //     "33mxloqJDHVyHUfbxtO0dvtk8PB3" :{
    //         submittedBy : "33mxloqJDHVyHUfbxtO0dvtk8PB3",
    //         submittedByName : "Anushree Pal",
    //         vote:0,
    //         orderBy:5
    //     },
    //     "aqmFXFasliOcbaLwZ7333jbxvyU2" :{
    //         submittedBy : "aqmFXFasliOcbaLwZ7333jbxvyU2",
    //         submittedByName : "Aryaman Singh",
    //         vote:0,
    //         orderBy:6
    //     },
    //     "b1FX0AhTL1UGVUMctgkSZEafjHj2" :{
    //         submittedBy : "b1FX0AhTL1UGVUMctgkSZEafjHj2",
    //         submittedByName : "	Bidipta Saha",
    //         vote:0,
    //         orderBy:7
    //     },
    //     "SsNTZXOsTIaa2kEIqB3PiaPP5Sf2" :{
    //         submittedBy : "SsNTZXOsTIaa2kEIqB3PiaPP5Sf2",
    //         submittedByName : "Poulami Samui",
    //         vote:0,
    //         orderBy:8
    //     },
    //     "sThxp9NvPNb4bEgRyJC7pKMGzyz2" :{
    //         submittedBy : "sThxp9NvPNb4bEgRyJC7pKMGzyz2",
    //         submittedByName : "Dipanjan Das",
    //         vote:0,
    //         orderBy:9
    //     },
    //     "IM48GByEYxXZaThI4zt0bpnoLPp1" :{
    //         submittedBy : "IM48GByEYxXZaThI4zt0bpnoLPp1",
    //         submittedByName : "Dipro Soren",
    //         vote:0,
    //         orderBy:10
    //     },
    //     "hV7yAsN9c0XSjie399Y7Uokfhw12" :{
    //         submittedBy : "hV7yAsN9c0XSjie399Y7Uokfhw12",
    //         submittedByName : "Ipsita Bhattacharya",
    //         vote:0,
    //         orderBy:11
    //     },
    //     "YBZgjPh3HoakGYGM3lhNot4HtWy1" :{
    //         submittedBy : "YBZgjPh3HoakGYGM3lhNot4HtWy1",
    //         submittedByName : "Ishani Samanta",
    //         vote:0,
    //         orderBy:12
    //     },
    //     "Fh3WTaSv2RUKRGYD81m542glf8X2" :{
    //         submittedBy : "Fh3WTaSv2RUKRGYD81m542glf8X2",
    //         submittedByName : "Sayantan Dutta",
    //         vote:0,
    //         orderBy:13
    //     },
    //     "HL44BGfuJIZISQojUXdrK1SfFLL2" :{
    //         submittedBy : "HL44BGfuJIZISQojUXdrK1SfFLL2",
    //         submittedByName : "Mayukh Ghosh",
    //         vote:0,
    //         orderBy:14
    //     },
    //     "p7pVXWMlBBYzsUKpq2HgJMvWFiR2" :{
    //         submittedBy : "p7pVXWMlBBYzsUKpq2HgJMvWFiR2",
    //         submittedByName : "MD SAOOD KHAN",
    //         vote:0,
    //         orderBy:15
    //     },
    //     "UHdQLqJxGRVC9fvwT0NigmJmLRu1" :{
    //         submittedBy : "UHdQLqJxGRVC9fvwT0NigmJmLRu1",
    //         submittedByName : "Prashant Kumar Mishra",
    //         vote:0,
    //         orderBy:16
    //     },
    //     "OdP3ZTJHnObXtEElzlhPUYlmU8R2" :{
    //         submittedBy : "OdP3ZTJHnObXtEElzlhPUYlmU8R2",
    //         submittedByName : "Saranda Poddar",
    //         vote:0,
    //         orderBy:17
    //     },
    //     "bsTG3qTYo4UngJY1D8uvtA4cNNh1" :{
    //         submittedBy : "bsTG3qTYo4UngJY1D8uvtA4cNNh1",
    //         submittedByName : "	Rounak Hazra",
    //         vote:0,
    //         orderBy:18
    //     },
    //     "GPVZa2YXM3VDrQFq8J0AHqWCM4K2" :{
    //         submittedBy : "GPVZa2YXM3VDrQFq8J0AHqWCM4K2",
    //         submittedByName : "Rishita Roy",
    //         vote:0,
    //         orderBy:19
    //     },
    //     "kIi12tkkqVaBZLtiTSR63PIvYZ92" :{
    //         submittedBy : "kIi12tkkqVaBZLtiTSR63PIvYZ92",
    //         submittedByName : "Santonu Naskar ",
    //         vote:0,
    //         orderBy:19
    //     },
    //     "SsLvMId5RlSPA6zuWqqy1sblQei2" :{
    //         submittedBy : "SsLvMId5RlSPA6zuWqqy1sblQei2",
    //         submittedByName : "SATYAM KUMAR JHA",
    //         vote:0,
    //         orderBy:19
    //     },
    // }


    // useEffect(()=>{
    //     db.collection("events").doc("thewallartwork").update({voting})
    // },[])

    useEffect(()=>{
        db.collection("events").doc("thewallartwork").onSnapshot((docs)=>{
            if(docs.exists)
            {
                var result = Object.keys(docs.data().voting).map((orderBy) => docs.data().voting[orderBy]); 

                result.sort((a,b)=>a.orderBy-b.orderBy)
               
                setArtwork(result) 
            }
        })
    },[])
    
    useEffect(()=>{
        db.collection("events").doc("shutterbugphotos").onSnapshot((docs)=>{
            if(docs.exists)
            {
                var result = Object.keys(docs.data().voting).map((orderBy) => docs.data().voting[orderBy]); 

                result.sort((a,b)=>a.orderBy-b.orderBy)
               
                setPhotos(result) 
            }
        })
    },[])

    function vote(e,eventName,Id)
    {
        e.preventDefault()
        db.collection("events").doc(eventName).update({
            [`voting.`+Id+`.vote`]:firebasevalue.increment(1)
        }).then(()=>{
            console.log(currentUser)
            db.collection("users").doc(currentUser.uid).update({
               [`voted.`+eventName] : Id
               
            })
        })
    }

    function unVote(e,eventName,Id)
    {
        e.preventDefault()
        db.collection("events").doc(eventName).update({
            [`voting.`+Id+`.vote`]:firebasevalue.increment(-1)
        }).then(()=>{
            console.log(currentUser)
            db.collection("users").doc(currentUser.uid).update({
               [`voted.`+eventName] : firebasevalue.delete()
               
            })
        })
    }


    return (
        <Container fluid={true}>
        <Row>
          <Col lg={1}>
          <Sidebar />
          </Col>
          <Col lg={11}>
          <h1 className="section-heading mt-4">Vote</h1>
                <Container fluid>
                    <Row>
                        <Col lg={2} xs={6}>
                            <Button className="transparent_button w-100" onClick={()=>setFilter("artwork")}>Artwork</Button>
                        </Col>
                        {/* <Col lg={2} xs={6}>
                            <Button className="transparent_button w-100" onClick={()=>setFilter("article")}>Article</Button>
                        </Col>
                        <Col lg={2} xs={6}>
                            <Button className="transparent_button w-100" onClick={()=>setFilter("poetry")}>Poetry</Button>
                        </Col> */}
                        
                        <Col lg={2} xs={6}>
                            <Button className="transparent_button w-100" onClick={()=>setFilter("shutterbugphotos")}>shutterbugphotos</Button>
                        </Col>
                        
                        {/* <Col lg={2} xs={6}>
                            <Button className="transparent_button w-100" onClick={()=>setFilter("reellens")}>Reellens</Button>
                        </Col> */}
                    </Row>
                </Container>
                <Container fluid>
                    <Row className="mt-5">
                        {filter ==='artwork' && artwork && artwork.length>0 && artwork.map((art,index)=>{
                            if(typeof currentUser.voted === "object" && currentUser.voted.hasOwnProperty('thewallartwork') && currentUser.voted["thewallartwork"] != art.submittedBy)
                            {
                                return(<Col lg={3} md={3} className="item-container" key={index}>
                                <div className="item-holder">
                                    <img src={`./artwork/${art.submittedBy}-min.jpg`} className="item-holder-image img-fluid" />
                                    <div className="participant_count">
                                        <span>Total Votes</span>
                                        {art.vote}
                                    </div>
                                    <Button className="event_register" onClick={(e)=>vote(e,'thewallartwork',art.submittedBy)} disabled> <span class="major" >Already Voted</span> </Button>
                                </div>
                            </Col>)

                            }else if(typeof currentUser.voted === "object" && currentUser.voted.hasOwnProperty('thewallartwork') && currentUser.voted["thewallartwork"] === art.submittedBy) {
                                return(<Col lg={3} md={3} className="item-container" key={index}>
                                <div className="item-holder">
                                    <img src={`./artwork/${art.submittedBy}-min.jpg`} className="item-holder-image img-fluid" />
                                    <div className="participant_count">
                                        <span>Total Votes</span>
                                        {art.vote}
                                    </div>
                                    <Button className="event_register" onClick={(e)=>unVote(e,'thewallartwork',art.submittedBy)} > <span class="major" >Unvote</span> </Button>
                                </div>
                            </Col>)

                            }
                            else
                            {
                                return(<Col lg={3} md={3} className="item-container" key={index}>
                                <div className="item-holder">
                                    <img src={`./artwork/${art.submittedBy}-min.jpg`} className="item-holder-image img-fluid" />
                                    <div className="participant_count">
                                        <span>Total Votes</span>
                                        {art.vote}
                                    </div>
                                    <Button className="event_register" onClick={(e)=>vote(e,'thewallartwork',art.submittedBy)}> <span class="major">Vote </span> </Button>
                                </div>
                            </Col>)

                            }
                            
                        })

                        }
                        {console.log(filter)}
                        {filter ==='shutterbugphotos' && photos && photos.length>0 && photos.map((art,index)=>{
                            if(typeof currentUser.voted === "object" && currentUser.voted.hasOwnProperty('shutterbugphotos') && currentUser.voted["shutterbugphotos"] != art.submittedBy)
                            {
                                return(<Col lg={3} md={3} className="item-container" key={index}>
                                <div className="item-holder">
                                    <img src={`./shutterbug/${art.submittedBy}-min.jpg`} className="item-holder-image img-fluid" />
                                    <div className="participant_count">
                                        <span>Total Votes</span>
                                        {art.vote}
                                    </div>
                                    <Button className="event_register w-100" onClick={(e)=>vote(e,'shutterbugphotos',art.submittedBy)} disabled> <span class="major" >Already Voted</span> </Button>
                                </div>
                            </Col>)

                            }else if(typeof currentUser.voted === "object" && currentUser.voted.hasOwnProperty('shutterbugphotos') && currentUser.voted["shutterbugphotos"] === art.submittedBy) {
                                return(<Col lg={3} md={3} className="item-container" key={index}>
                                <div className="item-holder">
                                    <img src={`./shutterbug/${art.submittedBy}-min.jpg`} className="item-holder-image img-fluid" />
                                    <div className="participant_count">
                                        <span>Total Votes</span>
                                        {art.vote}
                                    </div>
                                    <Button className="event_register" onClick={(e)=>unVote(e,'shutterbugphotos',art.submittedBy)} > <span class="major" >Unvote</span> </Button>
                                </div>
                            </Col>)

                            }
                            else
                            {
                                return(<Col lg={3} md={3} className="item-container" key={index}>
                                <div className="item-holder">
                                    <img src={`./shutterbug/${art.submittedBy}-min.jpg`} className="item-holder-image img-fluid" />
                                    <div className="participant_count">
                                        <span>Total Votes</span>
                                        {art.vote}
                                    </div>
                                    <Button className="event_register" onClick={(e)=>vote(e,'shutterbugphotos',art.submittedBy)}> <span class="major">Vote </span> </Button>
                                </div>
                            </Col>)

                            }
                            
                        })

                        }
                    </Row>
                </Container>
          </Col>
          </Row>
          </Container>
    )
}

export default Vote
