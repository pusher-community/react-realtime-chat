from pusher import Pusher
import os
import cgi
from flask import Flask, render_template, request

app = Flask(__name__,  static_url_path='/static')

app_id = os.environ.get('PUSHER_CHAT_APP_ID')
key = os.environ.get('PUSHER_CHAT_APP_KEY')
secret = os.environ.get('PUSHER_CHAT_APP_SECRET')

pusher = Pusher(
  app_id=app_id,
  key=key,
  secret=secret
)

@app.route("/")
def show_index():
    return render_template('index.html', pusher_app_key=key)

@app.route('/messages', methods=['POST'])
def new_message():
  name, text = request.form['name'],  cgi.escape(request.form['text'])
  time = request.form['time']
  pusher.trigger('messages', 'new_message', {
    'text': text,
    'name': name,
    'time': time
  })
  return "great success!"

if __name__ == "__main__":
    app.run(debug=True)
