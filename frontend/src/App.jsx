// useState — хук для хранения данных, которые меняются и влияют на отображение
// useEffect — хук для выполнения кода ПОСЛЕ отрисовки компонента (например, запросы к API)
import { useState, useEffect } from 'react'

// Главный компонент приложения
function App() {
  // Создаём состояние для хранения ответа от сервера
  // message — переменная с данными
  // setMessage — функция для изменения message
  // '' — начальное значение (пустая строка)
  const [message, setMessage] = useState('')

  // useEffect выполняется один раз при загрузке компонента
  // [] — пустой массив зависимостей = выполнить только один раз
  useEffect(() => {
    // Делаем запрос к Go API
    // fetch — встроенная функция браузера для HTTP-запросов
    fetch('http://localhost:8080/api/hello')
      .then(response => {
        // response — объект ответа сервера
        // .json() — превращает JSON-ответ в JavaScript-объект
        // возвращает Promise, поэтому ещё один .then
        return response.json()
      })
      .then(data => {
        // data — уже распарсенный объект { message: "ок" }
        // сохраняем в состояние через setMessage
        setMessage(data.message)
      })
      .catch(error => {
        // Если сервер недоступен или ошибка сети
        console.error('Ошибка:', error)
        setMessage('Ошибка подключения к серверу')
      })
  }, []) // ← пустой массив = эффект сработает один раз при загрузке

  // JSX — HTML внутри JavaScript
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Mini-Drive</h1>
      
      {/* Показываем сообщение из состояния */}
      {/* Если message пустое — покажет "Загрузка..." */}
      <p>Ответ от сервера: {message || 'Загрузка...'}</p>
    </div>
  )
}

// Экспортируем компонент, чтобы использовать в main.jsx
export default App