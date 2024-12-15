import Buku from "../models/BukuModel.js"; // Import model Buku
import path from "path";
import fs from "fs";

export const getBuku = async (req, res) => {
    try {
        const response = await Buku.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getBukuById = async (req, res) => {
    try {
        const response = await Buku.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const saveBuku = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });

    const { judul_buku, penulis, penerbit, tahun_terbit, bahasa, jumlah } = req.body;
    const file = req.files.file; // Pastikan key file sesuai
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const filePath = `./public/images/buku/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(filePath, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Buku.create({
                judul_buku,
                penulis,
                penerbit,
                tahun_terbit,
                bahasa,
                jumlah,
                gambar: fileName,
            });
            res.status(201).json({ msg: "Buku berhasil dibuat" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Database error" });
        }
    });
};

export const savePinjaman = async (req, res) => {
    const { nama_peminjam, judul_buku, jumlah, status } = req.body;

    // Isi tanggal pengajuan dengan tanggal saat ini
    const tanggal_pengajuan = new Date();

    // Variabel untuk tanggal pinjaman (null jika status belum Approved)
    const tanggal_pinjaman = status === "Approved" ? new Date() : null;

    let fileName = null;

    if (req.files && req.files.file) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const filePath = `./public/images/pinjaman/${fileName}`;
        const allowedType = [".png", ".jpg", ".jpeg"];

        console.log("Validating uploaded file...");
        // Validasi file
        if (!allowedType.includes(ext.toLowerCase())) {
            console.log("Invalid file type:", ext);
            return res.status(422).json({ msg: "Invalid Images" });
        }
        if (fileSize > 5000000) {
            console.log("File size too large:", fileSize);
            return res.status(422).json({ msg: "Image must be less than 5 MB" });
        }

        // Pindahkan file ke folder tujuan
        try {
            file.mv(filePath);
            console.log("File uploaded successfully");
        } catch (err) {
            console.error("File upload error:", err);
            return res.status(500).json({ msg: err.message });
        }
    }

    try {
        // Simpan data ke database
        await Pinjaman.create({
            nama_peminjam,
            judul_buku,
            jumlah,
            tanggal_pengajuan, // Tanggal pengajuan otomatis
            tanggal_pinjaman, // Tanggal pinjaman hanya diisi jika status Approved
            status: status || "Pending", // Default status jika tidak diberikan
            gambar: fileName, // Gambar opsional
        });

        console.log("Pinjaman berhasil disimpan ke database");
        res.status(201).json({ msg: "Pinjaman berhasil dibuat" });
    } catch (error) {
        console.error("Database error:", error.message);
        res.status(500).json({ msg: "Database error" });
    }
};



export const updateBuku = async (req, res) => {
  const buku = await Buku.findOne({
      where: {
          id: req.params.id,
      },
  });

  if (!buku) return res.status(404).json({ msg: "Buku tidak ditemukan" });

  let fileName = buku.gambar; // Gunakan gambar lama jika tidak ada gambar baru
  if (req.files && req.files.file) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext; // Nama file baru
      const allowedType = [".png", ".jpg", ".jpeg"];

      // Validasi tipe dan ukuran file
      if (!allowedType.includes(ext.toLowerCase())) {
          return res.status(422).json({ msg: "File tidak valid. Hanya .png, .jpg, dan .jpeg yang diperbolehkan." });
      }
      if (fileSize > 5000000) {
          return res.status(422).json({ msg: "Ukuran file tidak boleh lebih dari 5 MB." });
      }

      // Hapus gambar lama jika ada
      const filePath = `./public/images/buku/${buku.gambar}`;
      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Gambar lama dihapus:", filePath);
      }

      // Simpan gambar baru
      const newFilePath = `./public/images/buku/${fileName}`;
      file.mv(newFilePath, (err) => {
          if (err) {
              console.error("Error saat menyimpan file:", err);
              return res.status(500).json({ msg: "Gagal mengunggah file." });
          }
          console.log("Gambar baru disimpan:", newFilePath);
      });
  }

  // Update data buku
  const { judul_buku, penulis, penerbit, tahun_terbit, bahasa, jumlah } = req.body;
  try {
      await Buku.update(
          {
              judul_buku,
              penulis,
              penerbit,
              tahun_terbit,
              bahasa,
              jumlah,
              gambar: fileName, // Update nama gambar jika ada
          },
          {
              where: {
                  id: req.params.id,
              },
          }
      );
      res.status(200).json({ msg: "Buku berhasil diperbarui" });
  } catch (error) {
      console.error("Error saat memperbarui buku:", error);
      res.status(500).json({ msg: "Gagal memperbarui buku." });
  }
};


export const deleteBuku = async (req, res) => {
    const buku = await Buku.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!buku) return res.status(404).json({ msg: "Buku tidak ditemukan" });

    try {
        const filePath = `./public/images/${buku.gambar}`;
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        await Buku.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Buku berhasil dihapus" });
    } catch (error) {
        console.log(error.message);
    }
};
