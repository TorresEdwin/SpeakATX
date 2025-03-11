// Filename - pages/about.js

import React, { useEffect, useState } from 'react';

const About = () => {
    const [commitStats, setCommitStats] = useState({});
    const [issueStats, setIssueStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = 'glpat-iNEmNztF2W1Do59uW6yx';
    const projectId = '67116641';  // Replace with your project ID
    const gitLabUrl = `https://gitlab.com/api/v4/projects/${projectId}`;

    const namesMap = new Map();

    namesMap.set("steven", "Steven Zheng")
    namesMap.set("maya", "Maya Lee")
    namesMap.set("edwin", "Edwin Torres")
    namesMap.set("amy", "Amy Wu")
    namesMap.set("shawn", "Shawn Tran")

    // Fetch commits per person
    const fetchCommits = async () => {
        try {
            let commits = [];
            let page = 1;

            while (true) {
                const response = await fetch(`${gitLabUrl}/repository/commits?per_page=100&page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (data.length === 0) break; // No more commits

                commits = commits.concat(data);
                page++;
            }

            // Group commits by author
            const commitCount = commits.reduce((acc, commit) => {
                var author = commit.author_name;

                for (let key of namesMap.keys()) {
                    if (author.toLowerCase().includes(key)) {
                        author = namesMap.get(key)
                    }
                }

                acc[author] = (acc[author] || 0) + 1;
                return acc;
            }, {});

            setCommitStats(commitCount);
        } catch (err) {
            setError('Failed to fetch commits');
        }
    };

    // Fetch issues per person (assignee)
    const fetchIssues = async () => {
        try {
            let issues = [];
            let page = 1;

            while (true) {
                const response = await fetch(`${gitLabUrl}/issues?per_page=100&page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (data.length === 0) break; // No more commits

                issues = issues.concat(data);
                page++;
            }

            // Group issues by assignee
            const issueCount = issues.reduce((acc, issue) => {
                var assignee = issue.assignee ? issue.assignee.name : 'Unassigned';

                for (let key of namesMap.keys()) {
                    if (assignee.toLowerCase().includes(key)) {
                        assignee = namesMap.get(key)
                    }
                }

                acc[assignee] = (acc[assignee] || 0) + 1;
                return acc;
            }, {});

            setIssueStats(issueCount);
        } catch (err) {
            setError('Failed to fetch issues');
        }
    };

    let people = [
        {
            name: "Steven Zheng", bio: "Steven is a third year CS major at UT Austin. In his spare time he enjoys building things and sleeping.",
            responsibilities: "Full Stack", commits: commitStats["Steven Zheng"], issues: issueStats["Steven Zheng"], unitTests: 0, imageUrl: "https://speakatx-images.s3.us-east-2.amazonaws.com/about_page/steven_zheng.jpg"
        },
        {
            name: "Maya Lee", bio: "Maya is a third year Computer Science Major at UT Austin. She enjoys doing arts and crafts such as drawing and painting.",
            responsibilities: "Full Stack", commits: commitStats["Maya Lee"], issues: issueStats["Maya Lee"], unitTests: 0, imageUrl: "https://speakatx-images.s3.us-east-2.amazonaws.com/about_page/MayaLee.JPEG"
        },
        {
            name: "Amy Wu", bio: "Amy is a third year Computer Science major at UT Austin. She enjoys swimming, drawing and traveling",
            responsibilities: "Full Stack", commits: commitStats["Amy Wu"], issues: issueStats["Amy Wu"], unitTests: 0, imageUrl: "https://speakatx-images.s3.us-east-2.amazonaws.com/about_page/amyWu.jpg"
        },
        {
            name: "Edwin Torres", bio: "Edwin is a third year CS major at UT Austin. He enjoys talking about new tech, gaming, and watching shows on Netflix.",
            responsibilities: "Full Stack", commits: commitStats["Edwin Torres"], issues: issueStats["Edwin Torres"], unitTests: 0, imageUrl: "https://speakatx-images.s3.us-east-2.amazonaws.com/about_page/Edwin_Torres.jpg"
        },
        {
            name: "Shawn Tran", bio: "Shawn is a junior at UT Austin, majoring in Computer Science. He enjoys gaming and cooking new dishes in his spare time.",
            responsibilities: "Full Stack", commits: commitStats["Shawn Tran"], issues: issueStats["Shawn Tran"], unitTests: 0, imageUrl: "https://speakatx-images.s3.us-east-2.amazonaws.com/about_page/Shawn_Tran.jpg"
        },
    ]

    // Fetch both commits and issues when component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchCommits(), fetchIssues()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <div><div class="spinner-border text-dark" role="status"></div></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <br /><br />
            <h1>
                About Us
            </h1>

            <p>SpeakATX aims to provide resources to minimal english and non-english speakers in Austin, TX. <br />
                This site uses Yelp, Google Maps, and Glassdoor APIs. Made with React and Node.js.</p>

            <p>Integrating diverse sources of data has been an interesting challenge. 
                In order to find businesses and communities that serve all of the diverse <br />language groups present in Austin, 
                we had to utilize various sources of data.  
                Many of these sources were formatted quite differently or were missing data.<br/>
                This provided an interesting exercise in data processing and imputation.</p>

            <br />

            <h2>
                Team Members
            </h2>

            <br />

            <div className="row d-flex justify-content-center">
                {people.map((person, index) => (
                    <div className="col-md-2 mb-3" key={index}>
                        <div className="card h-100 shadow-lg overflow-hidden rounded">

                            <img
                                src={person.imageUrl}
                                alt={person.name}
                                className="card-img-top"
                                style={{ height: "290px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '320px' }}>
                                    <p className="">
                                        <h5 className="">{person.name}</h5>
                                        {person.bio}
                                    </p>
                                    <p style={{ marginTop: 'auto' }}>
                                        Role: {person.responsibilities} <br />
                                        Commits: {person.commits} <br />
                                        Issues: {person.issues} <br />
                                        Unit Tests: {person.unitTests} <br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <br/>
            <a href = "https://documenter.getpostman.com/view/42364456/2sAYXFiHS8#intro">
            API Documentation
            </a>

        </div>
    );
};

export default About;