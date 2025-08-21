# CodeQuiz Generator

![Demo](./demo.gif)  <!-- Replace with the actual path to your demo GIF -->

**CodeQuiz Generator** is a full-stack web application built with **FastAPI** (backend) and **React** (frontend), featuring **Clerk** for user authentication, and deployed with **Docker**.  

Users can select a question difficulty (**Easy / Medium / Hard**), and the system uses an **LLM** to dynamically generate quiz questions. After answering, users receive **correct/incorrect** feedback with explanations. All solved questions are stored in the user’s **history**, and each user has **50 Challenges remaining per day**.

---

## Quick Start

```bash
# 1. Clone the repository
git clone ***
cd codequiz-generator

# 2. Backend setup
cd backend
# add your own API keys in .env file
uv add fastapi uvicorn sqlalchemy python-dotenv openai clerk-backend-api
uv run ./server.py   # Start the backend server

# 3. Frontend setup (in another terminal)
cd frontend
npm install react-router-dom@6 @clerk/clerk-react
npm run dev          # The frontend will run at http://localhost:5173

# 4. Build and run with Docker Compose
# To deploy the project with Docker:
docker compose up --build
# Frontend: http://localhost/
# Backend API: http://localhost:8000/
```



what's the difference between JSON and python Dict?

JSON is a pure string. 语言无关的（Java、JS、Python 都能读

`json.loads(...)` 就是把文本（JSON）**解析**成内存里的 dict。

`json.dumps(...)` 则是反过来，把 dict **转成 JSON 字符串**。



__init__.py的作用

from myproject.routes import challenge 隐式命名空间包

whats the difference of challenge_data and new_challenge?

challenge_data is a python dict.  challenge_data["title"

new_challenge is an instance of class Challenge.  new_challenge.title



depends - db

模块化



CORS



After choosing a difficulty level, when you click "Generate Challenge" button, 

```
const data = await makeRequest("generate-challenge", {
  method: "POST",
  body: JSON.stringify({ difficulty }),
});
```

后端generate-challenge router接收参数difficulty，执行 generate_challenge 函数，其中：

- user authentication（clerk） 
- Quota check(>0)

- 调用generate_challenge_with_ai函数：调用llm model生成new challenge，存储到db里面（create_challenge）

- store new_challenge in db

- return challenge data to frontend

  



```
challenge_data = generate_challenge_with_ai(request.difficulty)

new_challenge = create_challenge(
    db=db,
    difficulty=request.difficulty,
    created_by=user_id,
    title=challenge_data["title"],
    options=json.dumps(challenge_data["options"]),
    correct_answer_id=challenge_data["correct_answer_id"],
    explanation=challenge_data["explanation"]
)

quota.quota_remaining -= 1
db.commit()

return {
    "id": new_challenge.id,
    "difficulty": request.difficulty,
    "title": new_challenge.title,
    "options": json.loads(new_challenge.options),
    "correct_answer_id": new_challenge.correct_answer_id,
    "explanation": new_challenge.explanation,
    "timestamp": new_challenge.date_created.isoformat()
}
```





