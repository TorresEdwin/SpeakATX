// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const communities = [
    { 
        name: "Austin Independent School District", 
        language: "All", 
        area: "Austin", 
        about: "The AEL program operates with the foundational principle that language should never be a barrier that prevents one from reaching their life goals. Students that are enrolled in and attend our ESL classes not only increase their command and use of the English language, but they are also better equipped to engage with school staff, PTA’s and others on behalf of their children's educational pursuits. ",
        imageUrl: "https://www.hillelementary.com/wp-content/uploads/2021/07/AISD-Logo-1.png"
    },
    { 
        name: "Mercadito Hispano en Austin Texas", 
        language: "Spanish", 
        area: "Austin",
        about: "Grupo de compra venta en Austin Texas, libre de spam. Ofrece tus productos con seguridad.",
        imageUrl: "https://scontent-dfw5-1.xx.fbcdn.net/v/t1.6435-9/81883346_186107322510552_8112905764277846016_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2285d6&_nc_ohc=6vlGgWprQ7gQ7kNvgF0G5FL&_nc_oc=AdjRYImiVrN1Vn6TwKc1kZ4vKMGFByjasXbL4_WxZ7ySbgIRts1yjEkRaGKz4Lia2AA&_nc_zt=23&_nc_ht=scontent-dfw5-1.xx&_nc_gid=AcVrOS2ox2RXC-dBoDxJOJ9&oh=00_AYAagomj86N1XWSBiw8lgtcjpyhZZ_b5VBMWAVsXuyB53g&oe=67DB1D3A"
    },
    { 
        name: "Austin Chinese-American Network", 
        language: "Chinese", 
        area: "Austin",
        about: "奧斯汀华裔联盟(Austin Chinese-American Network, 简称ACAN)于2017年3月9日正式成立为一个独立的非盈利组织, 致力于服务本地华人社区, 弘扬中华文化, 维护华人权益, 增强华人群体的凝聚力。奧斯汀华裔联盟已经正式获得美国税务局(IRS)作为 501(c)(3)公益组织的认证。联盟将以丰富多彩的活动形式促进华人社区的交流和相互理解，鼓励本地华裔同胞关心政务，参与公共事务和社区服务，希望有更多的华人成为主流社会的领袖。",
        imageUrl: "https://austinchineseamericannetwork.org/wp-content/uploads/2023/03/cropped-ACAN-logo.png"
    }
]; 

const CommunityInstance = () => {
    const { communityName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const community = communities.find(community => community.name === communityName); // Find the matching job

    if (!community) {
        return <div className="container mt-4"><h1>Community Not Found</h1><button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    return (
        <div className="container mt-4">
            <h1>{community.name}</h1>
            <img src={community.imageUrl} alt={community.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover" }} />
            <p><strong>Language:</strong> {community.language}</p>
            <p><strong>Area:</strong> {community.area}</p>
            <p><strong>About:</strong> {community.about}</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default CommunityInstance;