import { Request, Response } from 'express'; // Make sure to import the appropriate types for `req` and `res`

async function index(req: Request, res: Response) {
    const { db, User } = req.app.get('sequelize');

    try {
        let loggedInUser = await db.query( //Sink
            `SELECT * FROM users WHERE user = '${req.query.user}' AND pass = '${req.query.pass}'`, //Source
            {
                model: User,
            }
        ); // Noncompliant

        res.send(JSON.stringify(loggedInUser));
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('Internal Server Error');
    }

    res.end();
}
