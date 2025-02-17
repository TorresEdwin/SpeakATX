import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const CommunitiesPage = () => {
    // Array of job links
    const communityLinks = [
        { name: "Austin Independent School District", type: "Tutoring", area: "Austin", imageUrl: "https://www.hillelementary.com/wp-content/uploads/2021/07/AISD-Logo-1.png", path: `/communities/test1`},
        { name: "Mercadito Hispano en Austin Texas", type: "Market", area: "Austin", imageUrl: "https://scontent-dfw5-1.xx.fbcdn.net/v/t1.6435-9/81883346_186107322510552_8112905764277846016_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2285d6&_nc_ohc=6vlGgWprQ7gQ7kNvgF0G5FL&_nc_oc=AdjRYImiVrN1Vn6TwKc1kZ4vKMGFByjasXbL4_WxZ7ySbgIRts1yjEkRaGKz4Lia2AA&_nc_zt=23&_nc_ht=scontent-dfw5-1.xx&_nc_gid=AcVrOS2ox2RXC-dBoDxJOJ9&oh=00_AYAagomj86N1XWSBiw8lgtcjpyhZZ_b5VBMWAVsXuyB53g&oe=67DB1D3A", path: `/communities/test2`},
        { name: "Austin Chinese-American Network", type: "Culture", area: "Austin", imageUrl: "https://austinchineseamericannetwork.org/wp-content/uploads/2023/03/cropped-ACAN-logo.png", path: `/communities/test3`},
    ];

    return (
        <div className="container my-4">
            <br/>
            <h1 className="mb-4">Communities in Austin</h1>
            <p className="mb-4">Number of communities: {communityLinks.length}</p>
            
            <div className="row">
            {communityLinks.map((jobItem, index) => (
                <div className="col-md-4 mb-3" key={index}>
                    <Link 
                        to={`/communities/${jobItem.name}`}  // Links to dynamic job page
                        className="card text-decoration-none"
                    >
                        <img 
                            src={jobItem.imageUrl} 
                            alt={jobItem.name} 
                            className="card-img-top" 
                            style={{ height: "220px", objectFit: "cover" }} 
                        />
                        <div className="card-body">
                            <h5 className="card-title">{jobItem.name}</h5>
                            <p className="card-text">
                                Area: {jobItem.area} <br />
                                Type: {jobItem.type}
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    );
};

export default CommunitiesPage;
