
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPetAdvice = async (history: ChatMessage[], message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `你是一个专业的宠物商店助手，名叫"萌宠助手"。
        1. 你的职责是回答用户关于养宠、选宠、宠物健康和行为的问题。
        2. 语气应当友好、活泼、充满爱心。
        3. 如果用户询问要买什么宠物，你可以根据他们的居住环境（公寓/别墅）、空闲时间、是否有小孩等因素提供建议。
        4. 回答尽量简洁，使用Markdown格式，可以使用Emoji来增加趣味性。
        5. 你知道我们店里有狗狗（金毛、法斗）、猫咪（布偶、孟买）、小宠（垂耳兔）和水族（孔雀鱼）。`,
        temperature: 0.8,
      },
    });

    return response.text || "抱歉，我现在有点走神，请再问我一次吧。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "由于网络波动，我暂时无法回应。请稍后再试。";
  }
};
