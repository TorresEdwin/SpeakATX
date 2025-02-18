class Instances {
    static jobs = [
        { 
            name: "Chick-Fil-A", 
            title: "Team Member", 
            pay: 13, 
            language: "Spanish", 
            area: "Austin", 
            imageUrl: "https://download.logo.wine/logo/Chick-fil-A/Chick-fil-A-Logo.wine.png",
            jobUrl: "https://www.indeed.com/viewjob?jk=9e4a110fd7f3bae2&from=shareddesktop"
        },
        { 
            name: "Family Tree Private Care", 
            title: "Care Giver", 
            pay: 17, 
            language: "Vietnamese", 
            area: "Austin", 
            imageUrl: "https://familytreecares.com/wp-content/uploads/2022/05/logo.png",
            jobUrl: "https://www.indeed.com/cmp/Family-Tree-Private-Care/jobs?jk=c1b30935fa3fd2ed&start=0&clearPrefilter=1"
        },
        { 
            name: "Tso Chinese", 
            title: "Store Manager", 
            pay: 34, 
            language: "Chinese", 
            area: "Austin", 
            imageUrl: "https://speakatx-images.s3.us-east-2.amazonaws.com/jobs_page/tso_chinese.png",
            jobUrl: "https://tsochinese.com/jobs"
        }
    ]; 

    static translations = [
        { 
            name: "Dịch Vụ Dịch Thuật", 
            rating: "4.8", 
            language: "Vietnamese, English", 
            area: "Downtown Austin", 
            price: 40,
            pricing: "Budget",
            imageUrl: "https://img.freepik.com/premium-vector/map-city-vector-illustration_276184-55.jpg"
        },
        { 
            name: "El Buen Servicio", 
            rating: "4.5", 
            language: "Spanish, English", 
            area: "North Austin", 
            price: 25,
            pricing: "Budget",
            imageUrl: "https://cdn.prod.website-files.com/5c29380b1110ec92a203aa84/66e5ce469b48938aa34d8684_Google%20Maps%20-%20Compressed.jpg"
        },
        { 
            name: "Bu Hui Shuo Yingwen", 
            rating: "4.2", 
            language: "Chinese, English", 
            area: "South Austin", 
            price: 15,
            pricing: "Budget",
            imageUrl: "https://media.istockphoto.com/id/518371862/vector/abstract-city-map-illustration.jpg?s=612x612&w=0&k=20&c=LmqeyKSPkDfN_Wk4W6dxlopvIm8KYq81t1eXHM0c34E="
        }
    ];
    
    static communities = [
        { 
            name: "Austin ISD English Second Language", 
            language: "English", 
            area: "Austin", 
            type: "Tutoring",
            member_count: "2,400+",
            about: "The AEL program operates with the foundational principle that language should never be a barrier that prevents one from reaching their life goals. Students that are enrolled in and attend our ESL classes not only increase their command and use of the English language, but they are also better equipped to engage with school staff, PTA’s and others on behalf of their children's educational pursuits. ",
            imageUrl: "https://www.hillelementary.com/wp-content/uploads/2021/07/AISD-Logo-1.png"
        },
        { 
            name: "Mercadito Hispano en Austin Texas", 
            language: "Spanish", 
            area: "Austin",
            type: "Marketing",
            member_count: "1,300+",
            about: "Grupo de compra venta en Austin Texas, libre de spam. Ofrece tus productos con seguridad.",
            imageUrl: "https://scontent-dfw5-1.xx.fbcdn.net/v/t1.6435-9/81883346_186107322510552_8112905764277846016_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2285d6&_nc_ohc=6vlGgWprQ7gQ7kNvgF0G5FL&_nc_oc=AdjRYImiVrN1Vn6TwKc1kZ4vKMGFByjasXbL4_WxZ7ySbgIRts1yjEkRaGKz4Lia2AA&_nc_zt=23&_nc_ht=scontent-dfw5-1.xx&_nc_gid=AcVrOS2ox2RXC-dBoDxJOJ9&oh=00_AYAagomj86N1XWSBiw8lgtcjpyhZZ_b5VBMWAVsXuyB53g&oe=67DB1D3A"
        },
        { 
            name: "Austin Chinese-American Network", 
            language: "Chinese", 
            area: "Austin",
            type: "Culture",
            member_count: "1,000+",
            about: "奧斯汀华裔联盟(Austin Chinese-American Network, 简称ACAN)于2017年3月9日正式成立为一个独立的非盈利组织, 致力于服务本地华人社区, 弘扬中华文化, 维护华人权益, 增强华人群体的凝聚力。奧斯汀华裔联盟已经正式获得美国税务局(IRS)作为 501(c)(3)公益组织的认证。联盟将以丰富多彩的活动形式促进华人社区的交流和相互理解，鼓励本地华裔同胞关心政务，参与公共事务和社区服务，希望有更多的华人成为主流社会的领袖。",
            imageUrl: "https://austinchineseamericannetwork.org/wp-content/uploads/2023/03/cropped-ACAN-logo.png"
        },
        { 
            name: "Vietnamese American Community of Austin", 
            language: "Vietnamese", 
            area: "Austin",
            type: "Culture",
            member_count: "1,000+",
            about: "VACAT is a 501(c)(3) nonprofit serving the Vietnamese American community in the Austin, Texas area. ",
            imageUrl: "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/326387993_1237149163561794_746506842489137586_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=aZrrpexCgjAQ7kNvgG7x91F&_nc_oc=AdihZ-f92mGwDxKBfXum_tMyMet8ENxcTN-0m0FjC7EI3TaEg0BoWercXqw4TNsB860&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=Ad6PJPEp9B8gGUK-L4kDUkZ&oh=00_AYDJdp69sojaVxeVF6MBh068DTJ-2v9FhDfI5-gfaCQ_zw&oe=67B9AC27"
        },
    ]; 

    static matchingValues(str1, str2) {
        // Split the strings into arrays and remove extra spaces (if any)
        const arr1 = str1.split(',').map(item => item.trim());
        const arr2 = str2.split(',').map(item => item.trim());
    
        // Convert arrays to Sets for easy comparison
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
    
        // Check if there's any intersection between the two sets
        for (let value of set1) {
            if (set2.has(value)) {
                return true; // Matching value found
            }
        }
        return false; // No matching values
    }
}

export default Instances