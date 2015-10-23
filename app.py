from pusher import Pusher
import os
import cgi
from flask import Flask, render_template, request, jsonify

from messages_repo import MessagesRepo

app = Flask(__name__,  static_url_path='/static')

app_id = os.environ.get('PUSHER_CHAT_APP_ID')
key = os.environ.get('PUSHER_CHAT_APP_KEY')
secret = os.environ.get('PUSHER_CHAT_APP_SECRET')

pusher = Pusher(
  app_id=app_id,
  key=key,
  secret=secret
)

repo = MessagesRepo()

@app.route("/")
def show_index():
    return render_template('index.html', pusher_app_key=key)
    
@app.route('/messages', methods=['GET'])
def get_messages():
    after_id = request.args.get('after_id', 0)
    messages = repo.get_all(after_id);
    return jsonify(messages)    

@app.route('/messages', methods=['POST'])
def new_message():
  name, text = cgi.escape(request.form['name']),  cgi.escape(request.form['text'])
  
  message = repo.create(name, text)
  
  try:
      pusher.trigger('messages', 'new_message', message)
  except Exception as e:
      print("Error triggering the event via Pusher %s" % e)
        
  return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
