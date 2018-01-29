import time


def log(*args, **kwargs):
    # time.time() 返回 unix time
    # 如何把 unix time 转换为普通人类可以看懂的格式呢？
    _format = '%H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(_format, value)
    with open('log.gua.txt', 'a', encoding='utf-8') as f:
        print(dt, *args, file=f, **kwargs)
    print(dt, *args, **kwargs)


def gen_session_id():
    """生成长度为32位的hex字符串，用于第三方session的key"""
    import uuid
    session_id = str(uuid.uuid4())
    return session_id
