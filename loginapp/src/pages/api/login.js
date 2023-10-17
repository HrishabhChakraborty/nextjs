let lastSuccessfulLogin = null;  // For storing the last successful login

export default (req, res) => {
    if (req.method === 'GET') {
        if (lastSuccessfulLogin) {
            return res.status(200).json(lastSuccessfulLogin);
        } else {
            return res.status(200).json({ message: "No successful login recorded." });
        }
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Only POST is allowed.' });
    }

    const { email, password } = req.body;
    const dummyEmail = "user@example.com";
    const dummyPassword = "password123";

    if (email === dummyEmail && password === dummyPassword) {
        lastSuccessfulLogin = { email, password };
        return res.status(200).json({ email, password });
    } else {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
};
