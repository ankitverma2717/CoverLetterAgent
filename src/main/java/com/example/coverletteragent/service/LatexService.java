package com.example.coverletteragent.service;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class LatexService {

    public byte[] createLatexProjectZip(String latexContent) throws IOException {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             ZipArchiveOutputStream zos = new ZipArchiveOutputStream(baos)) {

            ZipArchiveEntry entry = new ZipArchiveEntry("resume.tex");
            byte[] contentBytes = latexContent.getBytes(StandardCharsets.UTF_8);
            entry.setSize(contentBytes.length);
            zos.putArchiveEntry(entry);
            zos.write(contentBytes);
            zos.closeArchiveEntry();

            zos.finish();
            return baos.toByteArray();
        }
    }
}
