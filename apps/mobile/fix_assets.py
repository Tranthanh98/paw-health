import struct, zlib, os

def make_png(width, height, r=99, g=102, b=241):
    def chunk(name, data):
        c = struct.pack('>I', len(data)) + name + data
        return c + struct.pack('>I', zlib.crc32(name + data) & 0xffffffff)

    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    raw = b''
    for y in range(height):
        raw += b'\x00'
        for x in range(width):
            raw += bytes([r, g, b])

    compressed = zlib.compress(raw)
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', ihdr_data)
    png += chunk(b'IDAT', compressed)
    png += chunk(b'IEND', b'')
    return png

files = {
    'assets/images/icon.png': (1024, 1024),
    'assets/images/adaptive-icon.png': (1024, 1024),
    'assets/images/favicon.png': (48, 48),
}

for path, (w, h) in files.items():
    data = make_png(w, h)
    with open(path, 'wb') as f:
        f.write(data)
    print(f"{path}: {os.path.getsize(path)} bytes ({w}x{h})")

print("Done!")
