"use client"
import React, { useState, useRef } from 'react';
import { FileText, Upload, X, File, Image, FileSpreadsheet, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [assignmentType, setAssignmentType] = useState('');
  const [wordCount, setWordCount] = useState('1000');
  const [deadline, setDeadline] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const fileInputRef = useRef(null);

  const assignmentTypes = [
    'Essay',
    'Research Paper',
    'Case Study',
    'Literature Review',
    'Lab Report',
    'Business Plan',
    'Thesis',
    'Dissertation',
    'Other'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading'
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload process
    newFiles.forEach(file => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === file.id ? { ...f, status: 'completed' } : f)
        );
      }, 2000);
    });
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5 text-blue-600" />;
    if (type.includes('spreadsheet') || type.includes('excel')) return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
    if (type.includes('pdf')) return <BookOpen className="w-5 h-5 text-red-600" />;
    return <File className="w-5 h-5 text-slate-600" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-indigo-100/40">
      {/* Main Content */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Upload Your Assignment
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Upload your requirements, reference materials, or guidelines to help us create the perfect assignment for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-gradient-to-br from-white/90 via-blue-50/40 to-purple-50/30 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-200/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Upload Files</h2>
              
              {/* Drag and Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50/50' 
                    : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Drag and drop files here
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Or click to browse files
                    </p>
                    <button
                      onClick={onButtonClick}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Choose Files
                    </button>
                  </div>
                  
                  <p className="text-sm text-slate-500">
                    Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)
                  </p>
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Uploaded Files</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map(file => (
                      <div
                        key={file.id}
                        className="bg-gradient-to-r from-white/80 to-blue-50/60 rounded-xl p-4 border border-slate-200/50 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="font-medium text-slate-900 truncate max-w-48">
                              {file.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {file.status === 'uploading' && (
                            <div className="flex items-center space-x-2 text-blue-600">
                              <Clock className="w-4 h-4 animate-spin" />
                              <span className="text-sm">Uploading...</span>
                            </div>
                          )}
                          {file.status === 'completed' && (
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          )}
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Assignment Details Section */}
            <div className="bg-gradient-to-br from-white/90 via-blue-50/40 to-purple-50/30 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-200/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Assignment Details</h2>
              
              <div className="space-y-6">
                {/* Assignment Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Assignment Type
                  </label>
                  <select
                    value={assignmentType}
                    onChange={(e) => setAssignmentType(e.target.value)}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm"
                  >
                    <option value="">Select assignment type</option>
                    {assignmentTypes.map(type => (
                      <option key={type} value={type}>{type}</  option>
                    ))}
                  </select>
                </div>

                {/* Word Count */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Word Count
                  </label>
                  <select
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value)}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm"
                  >
                    <option value="500">500 words</option>
                    <option value="1000">1,000 words</option>
                    <option value="1500">1,500 words</option>
                    <option value="2000">2,000 words</option>
                    <option value="2500">2,500 words</option>
                    <option value="3000">3,000 words</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Deadline
                  </label>
                  <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Additional Instructions
                  </label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={4}
                    className="w-full bg-gradient-to-r from-white/95 to-blue-50/90 border border-slate-300/50 rounded-xl px-4 py-4 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 shadow-sm resize-none"
                    placeholder="Provide any specific requirements, formatting guidelines, or additional context for your assignment..."
                  />
                </div>

                {/* Urgency Notice */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200/50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-orange-900 mb-1">Rush Orders</h4>
                      <p className="text-sm text-orange-800">
                        Need your assignment in less than 24 hours? Rush delivery is available for an additional fee.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>Generate Assignment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Features Reminder */}
          <div className="mt-12 bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-slate-200/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">What Happens Next?</h3>
              <p className="text-slate-600">Our AI will analyze your requirements and create a high-quality assignment</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Analysis</h4>
                <p className="text-sm text-slate-600">AI analyzes your files and requirements</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Generation</h4>
                <p className="text-sm text-slate-600">Creates original, plagiarism-free content</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Delivery</h4>
                <p className="text-sm text-slate-600">Download your completed assignment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}