from bottle import route, run, static_file

@route('/hello')

def hello():
    return "hello world"

@route('/time')

def time():
    return static_file("main.js", root='.')


run(host='localhost', port=8080, debug=True)