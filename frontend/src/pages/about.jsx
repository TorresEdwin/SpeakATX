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
    namesMap.set("amy", "Amy Park Wu")
    namesMap.set("shawn", "Shawn Tran")

    // Fetch commits per person
    const fetchCommits = async () => {
        try {
            const response = await fetch(`${gitLabUrl}/repository/commits?per_page=100`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const commits = await response.json();

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
            const response = await fetch(`${gitLabUrl}/issues?per_page=100`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const issues = await response.json();

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>
                About Us
            </h1>

            <p>SpeakATX is a website that aims to provide resources to <br />minimal english and non-english speakers in Austin, TX.</p>

            <h2>
                Team Members
            </h2>

            <p>Maya Lee - @MayaLee393</p>

            <p>Steven Zheng - @steven.zheng1</p>

            <p>Amy Wu - @amypwu</p>

            <p>Edwin Torres - @EdwinIsSad</p>

            <p>Shawn Tran - @stran7365</p>

            <h2>Commits by Person</h2>
            
            {Object.entries(commitStats).map(([author, count]) => (
                <p key={author}>{author}: {count} commits</p>
            ))}

            <h2>Issues by Person</h2>

            {Object.entries(issueStats).map(([assignee, count]) => (
                <p key={assignee}>{assignee}: {count} issues</p>
            ))}
        </div>
    );
};

export default About;