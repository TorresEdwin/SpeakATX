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
                    if(author.toLowerCase().includes(key)) {
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
                    if(assignee.toLowerCase().includes(key)) {
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
            <br/><br/>
            <h1>
                About Us
            </h1>

            <p>SpeakATX aims to provide resources to minimal english and non-english speakers in Austin, TX. <br/>
                This site uses Yelp, Google Maps, and Glassdoor APIs. Made with React and Node.js.</p>

            <p>We found that when integrating disparate data...</p>

            <br/>

            <h2>
                Team Members
            </h2>

            <br/>

            <p>
                <b>Maya Lee</b><br/>
                <img src="MayaLee.JPEG" alt="Image" width="300"/> <br/> <br/>
                <p>
                    Maya is a third year Computer Science Major at UT Austin. <br/>
                    She enjoys doing arts and crafts such as drawing and painting.<br/>
                </p>
                
                Responsibilities: Frontend + Backend<br/>
            </p>

            <br/>

            <p>
                <b>Steven Zheng</b><br/>
                <img src="steven_zheng.jpg" alt="Image" width="300"/> <br/> <br/>
                <p>
                    Steven is a third year CS major at UT Austin. <br/>
                    In his spare time he enjoys building things and sleeping.<br/>
                </p>
                
                Responsibilities: Frontend + Backend<br/>
            </p>

            <br/>

            <p>
                <b>Amy Wu</b><br/>
                <img src="amyWu.jpg" alt="Image" width="300"/> <br/>
                Bio: Insert bio here<br/>
                Responsibilities: Frontend + Backend<br/>
            </p>

            <br/>

            <p>
                <b>Edwin Torres</b><br/>
                <img src="Edwin_Torres.jpg" alt="Image" width="300"/> <br/>
                Bio: Insert bio here<br/>
                Responsibilities: Frontend + Backend<br/>
            </p>

            <br/>

            <p>
                <b>Shawn Tran</b><br/>
                <img src="Shawn_Tran.jpg" alt="Image" width="300"/> <br/> <br/>
                <p>
                    Shawn is a junior at UT Austin, majoring in Computer Science. <br/>
                    He enjoys gaming and cooking new dishes in his spare time.<br/>
                </p>
                
                Responsibilities: Frontend + Backend<br/>
            </p>

            <br/>

            <h2>Commits by Team Member</h2>
            
            {Object.entries(commitStats).map(([author, count]) => (
                <p key={author}>{author}: {count} commits</p>
            ))}

            <h2>Issues by Team Member</h2>

            {Object.entries(issueStats).map(([assignee, count]) => (
                <p key={assignee}>{assignee}: {count} issues</p>
            ))}

            <h2>Unit Tests by Team Member</h2>

            <p>Unassigned: 0 unit tests</p>
        </div>
    );
};

export default About;